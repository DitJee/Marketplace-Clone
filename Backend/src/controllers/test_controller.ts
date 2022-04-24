import pool from "../dbconfig/dbconnector";

class Employee {
  constructor() {}

  // ==> Method responsible for creating a new 'Employee':
  public createEmployee = async (req, res) => {
    const { name, job_role, salary, birth, employee_registration } = req.body;
    try {
      const { rows } = await pool.query(
        "INSERT INTO employee (name, job_role, salary, birth, employee_registration) VALUES ($1, $2, $3, $4, $5)",
        [name, job_role, salary, birth, employee_registration]
      );
      res.status(201).send({
        message: "Employee added successfully!",
        body: {
          employee: { name, job_role, salary, birth, employee_registration },
        },
      });
    } catch (error) {
      console.error("createEmployee", error);
      res.status(500).send({
        message: "An error has occurred.",
      });
    }
  };

  // ==> Method responsible for listing all 'Employees':
  public listAllEmployees = async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT 
                                              employee_id,
                                              name,
                                              job_role,
                                              salary,
                                              employee_registration,
                                              to_char(birth, 'yyyy-MM-dd') as birth
                                            FROM employee ORDER BY name asc`);
      res.status(200).send(rows);
    } catch (error) {
      console.error("listAllEmployees", error);
      res.status(500).send({
        message: "An error has occurred.",
      });
    }
  };

  // ==> Method responsible for listing a given 'Employee' by Id:
  public findEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        `SELECT 
                                          employee_id,
                                          name,
                                          job_role,
                                          salary,
                                          employee_registration,
                                          to_char(birth, 'yyyy-MM-dd') as birth
                                        FROM employee WHERE employee_id = $1`,
        [id]
      );
      if (!rows.length) {
        throw "employee_not_found";
      }
      res.status(200).send(rows[0]);
    } catch (error) {
      console.error("findEmployeeById", error);
      if (error == "employee_not_found") {
        res.status(404).send({
          message: "Employee not found.",
        });
      } else {
        res.status(500).send({
          message: "An error has occurred.",
        });
      }
    }
  };

  // ==> Method responsible for updating a given 'Employee' by Id:
  public updateEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
      const { name, job_role, salary, birth, employee_registration } = req.body;
      const { rows } = await pool.query(
        `UPDATE employee 
                                        SET name = $1,
                                        job_role = $2,
                                        salary = $3,
                                        birth = $4,
                                        employee_registration = $5
                                        WHERE employee_id = $6`,
        [name, job_role, salary, birth, employee_registration, id]
      );
      res.status(200).send({ message: "Employee Updated Successfully!" });
    } catch (error) {
      console.error("updateEmployeeById", error);
      res.status(500).send({
        message: "An error has occurred.",
      });
    }
  };

  // ==> Method responsible for deleting a given 'Employee' by Id:
  public deleteEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM employee WHERE employee_id = $1", [id]);
      res.status(200).send({ message: "Employee deleted successfully!" });
    } catch (error) {
      console.error("deleteEmployeeById", error);
      res.status(500).send({
        message: "An error has occurred.",
      });
    }
  };
}

export default new Employee();
