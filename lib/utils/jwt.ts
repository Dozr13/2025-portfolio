// Use process.env directly to avoid Edge Runtime issues
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')
