import { createParamDecorator } from "@nestjs/common";
import { IDisplayUser } from '../models/user.model';

/**
 * Custom Decorators for Authentication
 */
export const GetUser =  createParamDecorator((data, req): IDisplayUser => {
    return {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username,
        role: req.user.role,
        status: req.user.status,
        draftCount: req.user.draftCount,
        playlistCount: req.user.playlistCount
    };
});