const slugify = (text) => {
    const slug = text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
    return slug;
}

export default slugify;