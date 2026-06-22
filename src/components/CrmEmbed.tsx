// Embeds a form hosted in our own CRM (crm.awmedia.marketing) as an iframe.
// Replaces the old Typeform embeds. Height is fixed to match the CRM form
// layout; the iframe handles its own internal scrolling if it overflows.
export default function CrmEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={640}
      className="w-full rounded-2xl"
      style={{ border: 0 }}
    />
  );
}
