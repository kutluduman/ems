import { getMockReq, getMockRes } from "@jest-mock/express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";

import Employee from "../../models/Employee";
import { login, register, employee } from "../auth";
import {
  FIND_BY_EMAIL_MOCK,
  FIND_BY_ID_MOCK,
  NEW_EMPLOYEE_MOCK,
  TOKEN_MOCK,
} from "./auth.mock";

describe("Auth Controller", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("login", () => {
    test("should fail login request if email is not supplied in the request", async () => {
      // Arrange
      const mockReq = getMockReq({
        body: {
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await login(mockReq, mockRes);

      // Assert\
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Please enter all fields",
      });
    });

    test("should fail login request if password is not supplied in the request", async () => {
      // Arrange
      const mockReq = getMockReq({
        body: {
          email: "john@email.com",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await login(mockReq, mockRes);

      // Assert\
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Please enter all fields",
      });
    });

    test("should throw an error if the employee with the email doesn't exist", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "findOne").mockResolvedValueOnce(null);
      const mockReq = getMockReq({
        body: {
          email: "john@email.com",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await login(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Employee does not exist",
      });
    });

    test("should throw an error if wrong credentials are supplied", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findOne")
        .mockResolvedValueOnce(FIND_BY_EMAIL_MOCK);
      const bcryptCompareSpy = jest
        .spyOn(bcrypt, "compare")
        .mockResolvedValueOnce(false);
      const mockReq = getMockReq({
        body: {
          email: "john@email.com",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await login(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(bcryptCompareSpy).toBeCalledWith(
        "password",
        FIND_BY_EMAIL_MOCK.password
      );
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Invalid credentials",
      });
    });

    test("should throw an error if token couldn't be signed", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findOne")
        .mockResolvedValueOnce(FIND_BY_EMAIL_MOCK);
      const bcryptCompareSpy = jest
        .spyOn(bcrypt, "compare")
        .mockResolvedValueOnce(true);
      const jwtSignSpy = jest.spyOn(jwt, "sign").mockReturnValueOnce(null);
      const mockReq = getMockReq({
        body: {
          email: "john@email.com",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await login(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(bcryptCompareSpy).toBeCalledWith(
        "password",
        FIND_BY_EMAIL_MOCK.password
      );
      expect(jwtSignSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Couldn't sign the token",
      });
    });

    test("should allow the user to login with the supplied credentials", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findOne")
        .mockResolvedValueOnce(FIND_BY_EMAIL_MOCK);
      const bcryptCompareSpy = jest
        .spyOn(bcrypt, "compare")
        .mockResolvedValueOnce(true);
      const jwtSignSpy = jest
        .spyOn(jwt, "sign")
        .mockReturnValueOnce(TOKEN_MOCK);
      const mockReq = getMockReq({
        body: {
          email: "john@email.com",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();
      const { _id, name, email } = FIND_BY_EMAIL_MOCK;

      // Act
      await login(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(bcryptCompareSpy).toBeCalledWith(
        "password",
        FIND_BY_EMAIL_MOCK.password
      );
      expect(jwtSignSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: TOKEN_MOCK,
        employee: {
          id: _id,
          name,
          email,
        },
      });
    });
  });

  describe("register", () => {
    test("should fail login request if name is not supplied in the request", async () => {
      // Arrange
      const mockReq = getMockReq({
        body: {
          surname: "surname",
          phoneNumber: "phoneNumber",
          address: "address",
          title: "title",
          email: "email",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert\
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Please enter all fields",
      });
    });

    test("should fail login request if email is not supplied in the request", async () => {
      // Arrange
      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          address: "address",
          title: "title",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert\
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Please enter all fields",
      });
    });

    test("should fail login request if password is not supplied in the request", async () => {
      // Arrange
      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          email: "email",
          address: "address",
          title: "title",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert\
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Please enter all fields",
      });
    });

    test("should throw an error if the employee with the email already exist", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findOne")
        .mockResolvedValueOnce(FIND_BY_EMAIL_MOCK);
      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          email: "email",
          address: "address",
          title: "title",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Employee already exists",
      });
    });

    test("should throw an error if the bcrypt isn't able to generate salt", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "findOne").mockResolvedValueOnce(null);
      const bcryptGenSaltSpy = jest
        .spyOn(bcrypt, "genSalt")
        .mockResolvedValueOnce(false);

      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          email: "email",
          address: "address",
          title: "title",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(bcryptGenSaltSpy).toHaveBeenCalledWith(10);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong with bcrypt",
      });
    });

    test("should throw an error if the bcrypt isn't able to generate hash", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "findOne").mockResolvedValueOnce(null);
      const bcryptGenSaltSpy = jest
        .spyOn(bcrypt, "genSalt")
        .mockResolvedValueOnce("qwertyuiop");

      const bcryptHashSpy = jest
        .spyOn(bcrypt, "hash")
        .mockResolvedValueOnce(false);

      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          email: "email",
          address: "address",
          title: "title",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(bcryptGenSaltSpy).toHaveBeenCalledWith(10);
      expect(bcryptHashSpy).toHaveBeenCalledWith("password", "qwertyuiop");
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong hashing the password",
      });
    });

    test("should throw an error if there was an error calling the save method on the Employee model", async () => {
      // Arrange
      const findOneSpy = jest
        .spyOn(Employee, "findOne")
        .mockResolvedValueOnce(null);
      const bcryptGenSaltSpy = jest
        .spyOn(bcrypt, "genSalt")
        .mockResolvedValueOnce("qwertyuiop");

      const bcryptHashSpy = jest
        .spyOn(bcrypt, "hash")
        .mockResolvedValueOnce("qwertyuioplkjhgfdsazxcvbnm");

      const spy = jest
        .spyOn(Employee.prototype, "save")
        .mockImplementationOnce(() => Promise.resolve(null));

      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          email: "email",
          address: "address",
          title: "title",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert
      expect(findOneSpy).toBeCalledTimes(1);
      expect(bcryptGenSaltSpy).toHaveBeenCalledWith(10);
      expect(bcryptHashSpy).toHaveBeenCalledWith("password", "qwertyuiop");
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong saving the employee",
      });
    });

    test("should create a new Employee successfully", async () => {
      // Arrange
      const findOneSpy = jest
        .spyOn(Employee, "findOne")
        .mockResolvedValueOnce(null);
      const bcryptGenSaltSpy = jest
        .spyOn(bcrypt, "genSalt")
        .mockResolvedValueOnce("qwertyuiop");

      const bcryptHashSpy = jest
        .spyOn(bcrypt, "hash")
        .mockResolvedValueOnce("qwertyuioplkjhgfdsazxcvbnm");

      const spy = jest
        .spyOn(Employee.prototype, "save")
        .mockImplementationOnce(() =>
          Promise.resolve({ ...NEW_EMPLOYEE_MOCK, id: NEW_EMPLOYEE_MOCK._id })
        );

      const { _id, name, email } = NEW_EMPLOYEE_MOCK;

      const jwtSignSpy = jest.spyOn(jwt, "sign").mockReturnValue(TOKEN_MOCK);

      const mockReq = getMockReq({
        body: {
          name: "name",
          surname: "surname",
          phoneNumber: "phoneNumber",
          email: "email",
          address: "address",
          title: "title",
          password: "password",
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await register(mockReq, mockRes);

      // Assert
      expect(findOneSpy).toBeCalledTimes(1);
      expect(bcryptGenSaltSpy).toHaveBeenCalledWith(10);
      expect(bcryptHashSpy).toHaveBeenCalledWith("password", "qwertyuiop");
      expect(spy).toBeCalledTimes(1);
      expect(jwtSignSpy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: TOKEN_MOCK,
        employee: {
          id: _id,
          name,
          email,
        },
      });
    });
  });

  describe("employee", () => {
    test("should fail with error message if employee with id isn't found", async () => {
      // Arrange
      const findByIdSpy = jest
        .spyOn(Employee, "findById")
        .mockResolvedValueOnce(null);

      const mockReq = getMockReq({
        employee: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await employee(mockReq as AuthenticatedRequest, mockRes);

      // Assert
      expect(findByIdSpy).toBeCalledWith(FIND_BY_ID_MOCK._id);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Employee does not exist",
      });
    });

    test("should successfully return the employee details", async () => {
      // Arrange
      const findByIdSpy = jest
        .spyOn(Employee, "findById")
        .mockResolvedValueOnce(FIND_BY_ID_MOCK);

      const mockReq = getMockReq({
        employee: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await employee(mockReq as AuthenticatedRequest, mockRes);

      // Assert
      expect(findByIdSpy).toBeCalledWith(FIND_BY_ID_MOCK._id);
      delete FIND_BY_ID_MOCK.password;
      expect(mockRes.json).toHaveBeenCalledWith({
        ...FIND_BY_ID_MOCK,
      });
    });
  });
});
