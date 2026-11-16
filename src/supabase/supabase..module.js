var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { SupabaseProvider, SUPABASE } from './supabase.provider.js';
let SupabaseModule = class SupabaseModule {
};
SupabaseModule = __decorate([
    Global(),
    Module({
        providers: [SupabaseProvider],
        exports: [SUPABASE],
    })
], SupabaseModule);
export { SupabaseModule };
//# sourceMappingURL=supabase..module.js.map