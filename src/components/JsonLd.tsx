import { siteConfig } from "@/data/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.nickname,
  description: siteConfig.bio,
  url: siteConfig.siteUrl,
  email: siteConfig.email,
  jobTitle: "PhD Student & Researcher",
  worksFor: {
    "@type": "Organization",
    name: "University of Texas at Dallas",
    url: "https://www.utdallas.edu",
  },
  alumniOf: [
    {
      "@type": "Organization",
      name: "University of Minnesota, Twin Cities",
    },
  ],
  knowsAbout: ["XR", "HCI", "Spatial Computing", "Mixed Reality", "AR", "AI"],
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.x,
    siteConfig.socials.scholar,
  ].filter(Boolean),
  image: `${siteConfig.siteUrl}/images/profile.webp`,
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
