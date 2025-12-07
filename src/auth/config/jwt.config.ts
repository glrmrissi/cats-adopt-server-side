import { JwtModule } from "@nestjs/jwt";
// TODO: JWT issue and audience configuration parameters
export default JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET, 
    verifyOptions: {
        algorithms: ['HS256'],
        maxAge: '6h',
    },
});