export default async function sitemap() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Accounts`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch data from /api/Accounts");
      return []; // Return an empty array if API fails
    }

    const result = await res.json()

    const postEntries = result.map((id) => ({
      url: `${process.env.NEXT_PUBLIC_HOST}/Accounts/${id._id}`,
      lastModified: new Date(id.updatedAt)
    }));

  return [
    {
      url: process.env.NEXT_PUBLIC_HOST,
      lastModified: new Date("2024-11-01T00:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/about`,
      lastModified: new Date("2024-10-30T12:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/accountService`,
      lastModified: new Date("2024-11-05T15:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/contact`,
      lastModified: new Date("2024-11-02T09:30:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/profile`,
      lastModified: new Date("2024-11-03T18:15:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/search`,
      lastModified: new Date("2024-10-28T11:45:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/wishlist`,
      lastModified: new Date("2024-11-07T14:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/cart`,
      lastModified: new Date("2024-10-27T17:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/privacy-policy`,
      lastModified: new Date("2024-10-25T13:30:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/terms&amp;conditions`,
      lastModified: new Date("2024-11-08T10:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/exchange&amp;return`,
      lastModified: new Date("2024-11-09T16:00:00Z"),
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/faqs`,
      lastModified: new Date("2024-11-06T08:00:00Z"),
    },
    ...postEntries,
  ];
}
