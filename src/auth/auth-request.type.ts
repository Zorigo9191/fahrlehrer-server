import type { User } from '@supabase/supabase-js';
import type { Request } from 'express';

export type AuthRequest = Request & { user: User; role?: string };
