import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get(
  '/profile',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getUserProfile
);

router
  .route('/')
  .post(
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    UserController.updateProfile
  );

export const UserRoutes = router;
