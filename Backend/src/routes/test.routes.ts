import Router from "express-promise-router";
import Employee from "../controllers/test_controller";

const router = Router();

// ==> Route responsible for creating a new 'Employee': (POST): localhost:3000/api/employees
router.post("/employees", Employee.createEmployee);

// ==> Route responsible for listing all 'Employees': (GET): localhost:3000/api/employees
router.get("/employees", Employee.listAllEmployees);

// ==> Route responsible for listing a particular 'Employee' by Id: (GET): localhost:3000/api/employees/:id
router.get("/employees/:id", Employee.findEmployeeById);

// ==> Route responsible for updating a given 'Employee by Id: (PUT): localhost:3000/api/employees/:id
router.put("/employees/:id", Employee.updateEmployeeById);

// ==> Route responsible for deleting/deleting a given 'Employee by Id: localhost:3000/api/employees/:id
router.delete("/employees/:id", Employee.deleteEmployeeById);

export default router;
