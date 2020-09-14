import { Controller, UseGuards, Request, Post } from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiCreatedResponse({ description: 'Cadastro de Revendedor(a)' })
    @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
    @ApiBody({ type: Request })
    @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

}
