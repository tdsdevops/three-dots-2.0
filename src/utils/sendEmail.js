import supabase from '../supabaseClient';

export const sendEmail = async (functionName, payload, files = {}) => {
  const formData = new FormData();
  
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error("No active session found");
  }

  // ✅ Email params (from payload)
  if (payload.to) formData.append("to", payload.to);
  if (payload.from) formData.append("from", payload.from);
  if (payload.subject) formData.append("subject", payload.subject);
  if (payload.html) formData.append("html", payload.html);

  // ✅ Add other metadata (if needed)
  for (const key in payload) {
    if (!["to", "from", "subject", "html"].includes(key)) {
      formData.append(key, payload[key]);
    }
  }

  // ✅ File uploads
  for (const field in files) {
    if (files[field]) {
      formData.append(field, files[field]);
    }
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // ✅ POST request to Edge Function
  const res = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: formData,
  });

  return res.json();
};
