import { useMemo } from "react";

export function SocialSchema() {
  const linkedinUrl = String((import.meta as any).env?.VITE_SOCIAL_LINKEDIN_URL || "").trim();
  const sameAs = [linkedinUrl].filter(Boolean);

  const schema = useMemo(() => {
    if (sameAs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://strict-dev.com/#business",
      sameAs,
    };
  }, [linkedinUrl]);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
