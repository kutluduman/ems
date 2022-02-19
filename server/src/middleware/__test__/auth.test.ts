import { getMockReq, getMockRes } from "@jest-mock/express";
import jwt from "jsonwebtoken";

import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import Auth from "../auth";
import { TOKEN_MOCK } from "./auth.mock";

describe("Auth Middleware", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return error with status 401 if the request don't have an Authorization header", async () => {
    // Arrange
    const mockReq = getMockReq();
    const { res: mockRes, next } = getMockRes();

    // Act
    await Auth(mockReq as AuthenticatedRequest, mockRes, next);

    // Assert\
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "No token, authorization denied",
    });
  });

  test("should successfully call next method if token is valid", async () => {
    // Arrange
    const mockReq = getMockReq({
      headers: {
        Authorization: TOKEN_MOCK,
      },
    });
    const jestReqMock = jest
      .spyOn(mockReq, "header")
      .mockReturnValue(TOKEN_MOCK);
    const jwtVerifySpy = jest
      .spyOn(jwt, "verify")
      .mockResolvedValue({ id: "sdfjhgsfhj" });
    const { res: mockRes, next } = getMockRes();

    // Act
    await Auth(mockReq as AuthenticatedRequest, mockRes, next);

    // Assert\
    expect(jestReqMock).toHaveBeenCalledWith("Authorization");
    expect(jwtVerifySpy).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
