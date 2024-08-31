const FullVNFields = [
    "title",
    "description",
    "rating",
    "votecount",
    "length_minutes",
    "length_votes",
    "aliases",
    "developers.name",
    "image.url",
    "image.sexual",
    "image.violence",
    "tags.id",
    "tags.rating",
    "tags.name",
    "tags.spoiler",
    "tags.category",
    "screenshots.thumbnail",
    "screenshots.thumbnail_dims",
    "screenshots.sexual",
    "screenshots.violence",
    "screenshots.release.title",
    "relations.relation",
    "relations.relation_official",
    "relations.title",
].join(",");

const CoverVNFields = ["title", "image.url", "image.sexual", "image.violence"].join(
    ","
);

const FullReleaseFields = [
    "id",
    "title",
    "alttitle",
    "languages.lang",
    "languages.title",
    "languages.latin",
    "producers.name",
    "platforms",
    "released",
    "minage",
    "patch",
    "official",
    "voiced",
    "resolution",
    "freeware",
    "uncensored",
    "has_ero",
    "notes",
    "media.medium",
    "media.qty",
    "vns.rtype",
    "vns.title",
    "vns.developers.name",
    "gtin",
    "catalog",
    "extlinks.url",
    "extlinks.label",
].join(",");


export { FullVNFields, CoverVNFields, FullReleaseFields }
