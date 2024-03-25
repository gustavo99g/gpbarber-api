interface IJWTService {
  sign: (id: string) => string
  verify: (token: string) => string | null
}