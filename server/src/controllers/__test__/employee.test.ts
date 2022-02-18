import { getMockReq, getMockRes } from "@jest-mock/express";

import Employee from "../../models/Employee";
import { getAll, get, add, update, removeSome, remove } from "../employee";
import {
  EMPLOYEES_TO_DELETE_MOCK,
  FIND_BY_ID_AND_UPDATE_INPUT_MOCK,
  FIND_BY_ID_AND_UPDATE_OUTPUT_MOCK,
  FIND_BY_ID_MOCK,
  FIND_MOCK,
} from "./employees.mock";

describe("Employee Controller", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    test("should get all employees with successful response", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "find").mockResolvedValueOnce(FIND_MOCK);
      const mockReq = getMockReq();
      const { res: mockRes } = getMockRes();

      // Act
      await getAll(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledWith({ employees: FIND_MOCK });
    });

    test("should get all employees with failure response", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "find").mockResolvedValueOnce(null);
      const mockReq = getMockReq();
      const { res: mockRes } = getMockRes();

      // Act
      await getAll(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: "No employees exist" });
    });
  });

  describe("get", () => {
    test("should get employee for specified id with successful response", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findById")
        .mockResolvedValueOnce(FIND_BY_ID_MOCK);
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await get(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledWith(FIND_BY_ID_MOCK);
    });

    test("should get employee for specified id with failure response", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "findById").mockResolvedValueOnce(null);
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await get(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Employee does not exist",
      });
    });
  });

  describe("add", () => {
    test("should successfully add an employee", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee.prototype, "save")
        .mockImplementationOnce(() => Promise.resolve(FIND_BY_ID_MOCK));
      const mockReq = getMockReq({
        body: FIND_BY_ID_MOCK,
      });
      const { res: mockRes } = getMockRes();

      // Act
      await add(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ employee: FIND_BY_ID_MOCK });
    });

    test("should fail to add an employee", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee.prototype, "save")
        .mockImplementationOnce(() => Promise.resolve(null));
      const mockReq = getMockReq({
        body: FIND_BY_ID_MOCK,
      });
      const { res: mockRes } = getMockRes();

      // Act
      await add(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Something went wrong saving the employee",
      });
    });
  });

  describe("update", () => {
    test("should successfully update an employee", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findByIdAndUpdate")
        .mockResolvedValueOnce(FIND_BY_ID_AND_UPDATE_OUTPUT_MOCK);
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_AND_UPDATE_INPUT_MOCK._id,
        },
        body: FIND_BY_ID_AND_UPDATE_OUTPUT_MOCK,
      });
      const { res: mockRes } = getMockRes();

      // Act
      await update(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        employee: FIND_BY_ID_AND_UPDATE_OUTPUT_MOCK,
      });
    });

    test("should fail to update an employee", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "findByIdAndUpdate")
        .mockResolvedValueOnce(null);
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_AND_UPDATE_INPUT_MOCK._id,
        },
        body: FIND_BY_ID_AND_UPDATE_OUTPUT_MOCK,
      });
      const { res: mockRes } = getMockRes();

      // Act
      await update(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        msg: "Something went wrong updating the employee",
      });
    });
  });

  describe("removeSome", () => {
    test("should successfully delete some employees", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "deleteMany").mockResolvedValueOnce({
        deletedCount: EMPLOYEES_TO_DELETE_MOCK.length,
      } as any);
      const mockReq = getMockReq({
        body: {
          ids: EMPLOYEES_TO_DELETE_MOCK,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await removeSome(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        employees: {
          deletedCount: EMPLOYEES_TO_DELETE_MOCK.length,
        },
      });
    });

    test("should fail to remove some employees", async () => {
      // Arrange
      const spy = jest
        .spyOn(Employee, "deleteMany")
        .mockResolvedValueOnce(null);
      const mockReq = getMockReq({
        body: {
          ids: EMPLOYEES_TO_DELETE_MOCK,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await removeSome(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        msg: "Error deleting one or more employees",
      });
    });
  });

  describe("remove", () => {
    test("should successfully delete an employee", async () => {
      // Arrange
      const removeFunctionSpy = jest.fn().mockResolvedValue(FIND_BY_ID_MOCK);
      const spy = jest.spyOn(Employee, "findById").mockResolvedValueOnce({
        ...FIND_BY_ID_MOCK,
        remove: removeFunctionSpy,
      });
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await remove(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(removeFunctionSpy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        employee: FIND_BY_ID_MOCK,
      });
    });

    test("should find the employee successfully but fail to delete the found employee", async () => {
      // Arrange
      const removeFunctionSpy = jest.fn().mockResolvedValue(null);
      const spy = jest.spyOn(Employee, "findById").mockResolvedValueOnce({
        ...FIND_BY_ID_MOCK,
        remove: removeFunctionSpy,
      });
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await remove(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(removeFunctionSpy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        msg: "Something went wrong while trying to delete the employee",
      });
    });

    test("should fail to delete the specified employee since it isn't found", async () => {
      // Arrange
      const spy = jest.spyOn(Employee, "findById").mockResolvedValueOnce(null);
      const mockReq = getMockReq({
        params: {
          id: FIND_BY_ID_MOCK._id,
        },
      });
      const { res: mockRes } = getMockRes();

      // Act
      await remove(mockReq, mockRes);

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        msg: "No employee found",
      });
    });
  });
});
