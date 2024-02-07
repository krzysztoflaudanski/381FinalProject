"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDTO = void 0;
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../utils/match.decorator");
class RegisterDTO {
}
exports.RegisterDTO = RegisterDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5, { message: 'login Min length 5' }),
    (0, class_validator_1.MaxLength)(40, { message: 'login Max length 40' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'password Min length 10' }),
    (0, class_validator_1.MaxLength)(40, { message: 'password Max length 40' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'Min length 10' }),
    (0, class_validator_1.MaxLength)(40, { message: 'Max length 40' }),
    (0, match_decorator_1.Match)('password'),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "passwordRepeat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'firstName Min length 2' }),
    (0, class_validator_1.MaxLength)(25, { message: 'firstName Max length 25' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'lastName Min length 2' }),
    (0, class_validator_1.MaxLength)(25, { message: 'lastName Max length 25' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'lastName Min length 10' }),
    (0, class_validator_1.MaxLength)(50, { message: 'lastName Max length 50' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "address", void 0);
//# sourceMappingURL=create-user.dto.js.map