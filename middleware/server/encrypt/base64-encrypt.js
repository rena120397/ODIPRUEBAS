// Encode to Base64
export function btoa (b) {
  return Buffer.from(b).toString('base64')
}

// Dencode to Base64
export function atob (a) {
  return Buffer.from(a, 'base64').toString('utf8')
}

