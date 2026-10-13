export function safeWebUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export function imageSource(value) {
  return (
    safeWebUrl(value) ||
    (value && /^[\w.-]+$/.test(value)
      ? `${import.meta.env?.BASE_URL || "/"}images/${value}`
      : "")
  );
}

export function projectPayload(form) {
  const payload = {
    title: form.title.trim(),
    category: form.category.trim(),
    description: form.description.trim(),
    contribution: form.contribution.trim(),
    image: form.image.trim(),
    link: form.link.trim() || null,
    stack: [
      ...new Set(
        form.stack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    ],
    published: form.published,
    sort_order: Number(form.sort_order),
  };
  if (
    !payload.title ||
    !payload.category ||
    !payload.description ||
    !payload.contribution ||
    !payload.image ||
    !payload.stack.length
  )
    throw new Error(
      "Lengkapi judul, kategori, deskripsi, kontribusi, gambar, dan teknologi.",
    );
  if (payload.stack.length > 30)
    throw new Error("Gunakan maksimal 30 teknologi per proyek.");
  if (!safeWebUrl(payload.image) && !/^[\w.-]+$/.test(payload.image))
    throw new Error(
      "Gunakan URL gambar HTTP/HTTPS atau nama file gambar portfolio.",
    );
  if (payload.link && !safeWebUrl(payload.link))
    throw new Error("Link website harus berupa URL HTTP/HTTPS lengkap.");
  if (
    !Number.isInteger(payload.sort_order) ||
    payload.sort_order < 0 ||
    payload.sort_order > 100000
  )
    throw new Error("Urutan harus berupa angka bulat antara 0 dan 100000.");
  return payload;
}
