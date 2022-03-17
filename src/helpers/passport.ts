import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local';
import {Strategy as JwtStrategy, StrategyOptions} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import User from 'services/User';

passport.use(new LocalStrategy({
    usernameField:"email",
    session:false
}, async (email:string, password:string, done)=>{
    /**buscar usuario en bd por matricula */
    const clsUsr = new User();
    const user = await clsUsr.getUser(email);
    if(!user){
        return done(null,false)
    }else{
        const match = await clsUsr.compare(password,user.password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }
}));

let opts:StrategyOptions  = {
    secretOrKey:process.env.SECRET_TOKEN,
    algorithms:['HS256'],
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    done(null,jwt_payload)
}));