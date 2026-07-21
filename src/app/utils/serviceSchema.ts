const SITE_URL = "https://www.ecovibe.kz";

const PROVIDER = {
  "@type": "LocalBusiness",
  "@id": "https://www.ecovibe.kz/#business",
  name: "EcoVibe.kz",
  telephone: "+77073204199",
  email: "info@ecovibe.kz",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Astana",
    addressCountry: "KZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.128422,
    longitude: 71.470379,
  },
  priceRange: "₸₸",
  areaServed: {
    "@type": "City",
    name: "Astana",
  },
};

export function buildServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: PROVIDER,
    areaServed: {
      "@type": "City",
      name: "Astana",
    },
    url: `${SITE_URL}${input.path}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "KZT",
      price: input.priceFrom,
      availability: "https://schema.org/InStock",
    },
  };
}
