import emailjs from "@emailjs/browser";
import {
  buildContactTemplateParams,
  type ContactFormPayload,
} from "../../lib/contact-email";

export type { ContactFormPayload };

export function isEmailJsConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() &&
      import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  );
}

async function sendViaApi(payload: ContactFormPayload): Promise<boolean> {
  try {
    const response = await fetch("/api/send-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) return false;

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(body?.error ?? "Impossibile inviare la richiesta.");
    }

    return true;
  } catch (error) {
    if (error instanceof Error && error.message !== "Failed to fetch") {
      throw error;
    }
    return false;
  }
}

async function sendViaBrowser(payload: ContactFormPayload): Promise<void> {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();

  if (!publicKey || !serviceId || !templateId) {
    throw new Error("EmailJS non configurato.");
  }

  const templateParams = buildContactTemplateParams(payload);
  if ("error" in templateParams) {
    throw new Error(templateParams.error);
  }

  const result = await emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  });

  if (result.status !== 200) {
    throw new Error("Impossibile inviare la richiesta.");
  }
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
  const sentViaApi = await sendViaApi(payload);
  if (sentViaApi) return;

  await sendViaBrowser(payload);
}
