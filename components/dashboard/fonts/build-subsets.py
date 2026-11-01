"""Build web fonts with: python build-subsets.py (requires fonttools and brotli)."""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

FONTS = Path(__file__).resolve().parent
ROOT = FONTS.parents[2]
SOURCES = sorted(FONTS.parent.glob("*.js")) + sorted(FONTS.parent.glob("*.css"))
SOURCES += [ROOT / "index.html"]
SOURCES += [ROOT / page / "index.html" for page in (
    "best-study-app", "ypt-alternative"
)]

# Keep Latin letters, digits, punctuation, and combining accents for future copy,
# plus every literal character in the shared previews and their consuming pages.
# Other scripts in user-entered chat messages use the existing system fallback.
characters = set(range(0x20, 0x250)) | set(range(0x300, 0x370))
characters |= set(range(0x2000, 0x2070))
for source in SOURCES:
    characters.update(map(ord, source.read_text()))

for stem in ("NotoSans-Regular", "PlusJakartaSans-Bold"):
    original = FONTS / f"{stem}.ttf"
    output = FONTS / f"{stem}-latin.woff2"
    font = TTFont(original, recalcTimestamp=False)
    original_cmap = font.getBestCmap()
    expected = characters & original_cmap.keys()
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]  # Includes kerning and timer tabular figures.
    options.hinting = True
    options.name_IDs = ["*"]  # Retain attribution and license metadata.
    options.name_languages = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=expected)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(output)

    # Reopen the actual compressed output to validate coverage and digit metrics.
    with TTFont(output) as result, TTFont(original) as source:
        cmap = result.getBestCmap()
        assert expected <= cmap.keys(), f"Missing characters in {output.name}"
        assert result["head"].unitsPerEm == source["head"].unitsPerEm
        for table in ("hhea", "OS/2"):
            fields = ("ascent", "descent", "lineGap") if table == "hhea" else (
                "sTypoAscender", "sTypoDescender", "sTypoLineGap", "usWinAscent", "usWinDescent"
            )
            for field in fields:
                assert getattr(result[table], field) == getattr(source[table], field)
        for digit in "0123456789":
            code = ord(digit)
            assert result["hmtx"][cmap[code]] == source["hmtx"][original_cmap[code]]
        for table in ("GSUB", "GPOS"):
            if table in source and source[table].table.FeatureList:
                before = {f.FeatureTag for f in source[table].table.FeatureList.FeatureRecord}
                after = {f.FeatureTag for f in result[table].table.FeatureList.FeatureRecord} if table in result and result[table].table.FeatureList else set()
                assert "tnum" not in before or "tnum" in after, "Tabular figures lost"
    print(f"{output.name}: {original.stat().st_size:,} → {output.stat().st_size:,} bytes; "
          f"{len(expected)} characters verified")
