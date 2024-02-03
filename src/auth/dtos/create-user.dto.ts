import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, IsIn } from "class-validator";
import { Match } from "src/utils/match.decorator";


export class RegisterDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: 'login Min length 5' })
    @MaxLength(40, { message: 'login Max length 40' })
    login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'password Min length 10' })
    @MaxLength(40, { message: 'password Max length 40' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'Min length 10' })
    @MaxLength(40, { message: 'Max length 40' })
    @Match('password')
    passwordRepeat: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'firstName Min length 2' })
    @MaxLength(25, { message: 'firstName Max length 25' })
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'lastName Min length 2' })
    @MaxLength(25, { message: 'lastName Max length 25' })
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'lastName Min length 10' })
    @MaxLength(50, { message: 'lastName Max length 50' })
    address: string;
}