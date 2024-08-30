import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { LoginResponse } from "./dto/response/login.response";
import { PasswordService } from "src/tools/password.service";
import { JwtService } from "@nestjs/jwt";
import { Person } from "./person.entity";
import { RegisterResponse } from "./dto/response/register.response";
import { RegisterRequest } from "./dto/request/register.request";
import { LoginRequest } from "./dto/request/login.request";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Person) private readonly personRepository: Repository<Person>, private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService) { }

    public async doLogin(request: LoginRequest) {
        const response = new LoginResponse()
        const find = await this.userRepository.findOne({
            where: {
                email: request.email.toLowerCase()
            }
        });

        if (!find) {
            response.success = false;
            response.message = 'El usuario no existe';
            return response;
        } else {
            const comparision = await this.passwordService.comparePassword(request.password, find.password);

            if (comparision) {
                response.success = true;
                response.message = 'Sesion iniciada correctamente';

                var payload = {
                    sub: find.uuid
                };
                if(request.remember){
                    response.token = this.jwtService.sign(payload, {
                        expiresIn: '7d',
                        issuer: 'Contribuguate',
                        audience: 'contribuguate.com'
                    });
                }else{
                    response.token = this.jwtService.sign(payload, {
                        issuer: 'Contribuguate',
                        audience: 'contribuguate.com'
                    });
                }
                
                return response;
            } else {
                response.success = false;
                response.message = 'La contraseña es incorrecta';
                return response;
            }
        }
    }

    public async doRegister(request: RegisterRequest) {
        const response = new RegisterResponse();

        try {
            const find = await this.userRepository.findOne({
                where: [
                    { email: request.email.toLowerCase() },
                    { username: request.username.toLowerCase() }
                ]
            });

            if (find) {
                response.success = false;
                response.message = 'El usuario ya existe';
                return response;
            } else {
                var person = new Person();
                if (request.cui != null && request.cui != '') {
                    person.cui = request.cui;
                    person.firstname = request.firstname;
                    person.secondname = request.secondname;
                    person.surname = request.surname;
                    person.secondsurname = request.secondsurname;
                    person.phone = request.phone;

                } else {
                    person.firstname = request.firstname;
                    person.secondname = request.secondname;
                    person.surname = request.surname;
                    person.secondsurname = request.secondsurname;
                    person.phone = request.phone;
                }

                await this.personRepository.save(person);

                var user = new User();
                user.username = request.username;
                user.email = request.email.toLowerCase();
                user.password = await this.passwordService.hashPassword(request.password);
                await this.userRepository.save(user);
                response.success = true;
                response.message = 'Usuario creado correctamente';
                response.user = user;
                response.person = person;
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = err.message;
            return response;
        }
    }
}