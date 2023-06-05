const db = require("./Database/DB_Connection");

// Customer
const getCustomer = (req, res) => {
  db.query(
    "SELECT * FROM public.customers WHERE is_delete = false ORDER BY customers_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getCustomercount = (req, res) => {
  db.query(
    "SELECT * FROM public.customers WHERE is_delete = false",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows.length);
    }
  );
};

const getCustomerById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "SELECT * FROM public.customers WHERE customers_id = $1",
    [id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const createCustomer = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  let sql = "SELECT * FROM public.customers where email = $1";
  const oldUser = await db.query(sql, [email]);

  if (oldUser.rows.length != 0) {
    res.status(409).send("User Already Exist.");
  } else {
    db.query(
      "INSERT INTO public.customers (role,username, email,password,phone,address,popular_cars,credit_card,cardholder_name,card_expiration_date,cvv_cvc_code,is_delete) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
      [
        "user",
        name,
        email,
        password,
        phone,
        address,
        null,
        null,
        null,
        null,
        null,
        false,
      ],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(201).json(results.rows[0]);
      }
    );
  }
};

const updateCustomerCreaditCard = (req, res) => {
  const id = parseInt(req.params.id);
  const { creditcard, cardholdername, cardexp, cardcvc } = req.body;

  db.query(
    "UPDATE public.customers SET credit_card = $1, cardholder_name = $2,card_expiration_date=$3,cvv_cvc_code=$4 WHERE customers_id = $5",
    [creditcard, cardholdername, cardexp, cardcvc, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`User credit card info modified with ID: ${id}`);
    }
  );
};

const deleteCustomer = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.customers SET is_delete = $1 WHERE customers_id = $2",
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

const getCustomerByToken = (req, res) => {
  const { customers_id } = req.user;
  console.log(customers_id);

  db.query(
    "SELECT * FROM public.customers WHERE customers_id = $1",
    [customers_id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password, phone, address } = req.body;
  console.log(req.body);

  db.query(
    "UPDATE public.customers SET username = $1, email = $2,address=$3,password=$4,phone=$5 WHERE customers_id = $6",
    [name, email, address, password, phone, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Admin info  with ID: ${id} updated`);
    }
  );
};

// Provider
const getProvider = (req, res) => {
  db.query(
    "SELECT * FROM public.provider WHERE is_delete = false AND active = true  ORDER BY provider_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getNotAcceptedProvider = (req, res) => {
  db.query(
    "SELECT * FROM public.provider WHERE active = false AND is_delete = false  ORDER BY provider_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getProvidercount = (req, res) => {
  db.query(
    "SELECT * FROM public.provider WHERE is_delete = false",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows.length);
    }
  );
};

const getProviderById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "SELECT * FROM public.provider WHERE provider_id = $1",
    [id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const createProvider = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  let sql = "SELECT * FROM public.provider where email = $1";
  const oldprovider = await db.query(sql, [email]);

  if (oldprovider.rows.length != 0) {
    res.status(409).send("Provider Email Already Exist.");
  } else {
    db.query(
      "INSERT INTO public.provider (role,username, email,password,phone,address,is_delete,active) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *",
      ["provider", name, email, password, phone, address, false, false],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res
          .status(201)
          .send(`provider added with ID: ${results.rows[0].provider_id}`);
      }
    );
  }
};

const acceptProvider = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.provider SET active = $1 WHERE provider_id = $2",
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Provider with ID: ${id} Accepted`);
    }
  );
};

const deleteProvider = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.provider SET is_delete = $1 WHERE provider_id = $2",
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Provider deleted with ID: ${id}`);
    }
  );
};

const getProviderByToken = (req, res) => {
  const { provider_id } = req.user;
  db.query(
    "SELECT * FROM public.provider WHERE provider_id = $1",
    [provider_id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

// Admin
const getAdmin = (req, res) => {
  db.query(
    "SELECT * FROM public.admin ORDER BY admin_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const createAdmin = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  let sql = "SELECT * FROM public.admin where email = $1";
  const oldAdmin = await db.query(sql, [email]);

  if (oldAdmin.rows.length != 0) {
    res.status(409).send("Admin Email Already Exist.");
  } else {
    db.query(
      "INSERT INTO public.admin (role,username, email,password,phone,address) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
      ["admin", name, email, password, phone, address],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res
          .status(201)
          .send(`Admin added with ID: ${results.rows[0].admin_id}`);
      }
    );
  }
};

const getAdminByToken = (req, res) => {
  const { admin_id } = req.user;

  console.log(req.body);
  db.query(
    "SELECT * FROM public.admin WHERE admin_id = $1",
    [admin_id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const deleteAdmin = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.admin SET is_delete = $1 WHERE admin_id = $2",
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`admin deleted with ID: ${id}`);
    }
  );
};

// Car
const getCar = (req, res) => {
  db.query(
    "SELECT * FROM public.cars WHERE is_delete = false ORDER BY cars_id DESC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getCarscount = (req, res) => {
  db.query(
    "SELECT * FROM public.cars WHERE is_delete = false",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows.length);
    }
  );
};

const getRentedCarscount = (req, res) => {
  db.query(
    "SELECT * FROM public.cars WHERE available = false",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows.length);
    }
  );
};

const getCarsById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "SELECT * FROM public.cars WHERE cars_id = $1",
    [id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const createCar = async (req, res) => {
  const {
    discrabtion,
    type,
    energy_type,
    model,
    year,
    rental_price,
    images_data,
    seats_number,
    provider_id,
  } = req.body;

  db.query(
    "INSERT INTO public.cars (discrabtion,type,energy_type,model,year,rental_price,available,images_data,start_date,end_date,is_delete,provider_id,start_location,end_location,seats_number) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
    [
      discrabtion,
      type,
      energy_type,
      model,
      year,
      rental_price,
      true,
      images_data,
      null,
      null,
      false,
      provider_id,
      null,
      null,
      seats_number,
    ],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(201).send(`Car added with ID: ${results.rows[0].cars_id}`);
    }
  );
};

const rentedCars = (req, res) => {
  db.query(
    "SELECT * FROM public.cars WHERE is_delete = false AND available = false ORDER BY cars_id DESC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getCarsByIdProvider = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "SELECT * FROM public.cars WHERE provider_id = $1 AND is_delete = false",
    [id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const updateCar = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    discrabtion,
    type,
    energy_type,
    model,
    year,
    rental_price,
    images_data,
    seats_number,
  } = req.body;
  console.log(req.body);

  db.query(
    "UPDATE public.cars SET discrabtion = $1, type = $2, energy_type = $3, model = $4, year = $5, rental_price = $6, images_data = $7, seats_number = $8 WHERE cars_id = $9",
    [
      discrabtion,
      type,
      energy_type,
      model,
      year,
      rental_price,
      images_data,
      seats_number,
      id,
    ],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Admin info  with ID: ${id} updated`);
    }
  );
};

const bookCar = (req, res) => {
  const id = parseInt(req.params.id);
  const { start_date, end_date, start_location, end_location, user_id } =
    req.body;

  db.query(
    "UPDATE public.cars SET user_id = $1, start_date = $2,end_date=$3,start_location=$4,end_location=$5,available=$6 WHERE cars_id = $7",
    [user_id, start_date, end_date, start_location, end_location, false, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Car with ID: ${id} Booked`);
    }
  );
};

const deleteCars = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.cars SET is_delete = $1 WHERE cars_id = $2",
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Car  with ID: ${id} deleted`);
    }
  );
};

const checkCustomer = (req, res, next) => {

  const { email, password } = req.body;

  db.query(
    'SELECT * FROM public.customers WHERE is_delete = false ORDER BY customers_id ASC',
    (error, results) => {
      if (error) {
        return res.status(400).json(error)
      }

      const result = results.rows.find((user) => {
        return user.email === email && user.password === password;
      });

      if (result) {
        req.body = result;
        next();
      }
      else {
        res.status(404).send("user not exist");
      }

    }
  );
}

const checkAdmin = (req, res, next) => {

  const { email, password } = req.body;

  db.query(
    'SELECT * FROM public.admin WHERE is_delete = false ORDER BY admin_id ASC',
    (error, results) => {
      if (error) {
        return res.status(400).json(error)
      }

      const result = results.rows.find((user) => {
        return user.email === email && user.password === password;
      });

      if (result) {
        req.body = result;
        next();
      }
      else {
        res.status(404).send("admin not exist");
      }

    }
  );
}

const updateAdmin = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password, phone, address } = req.body;
  console.log(req.body);

  db.query(
    "UPDATE public.admin SET username = $1, email = $2,address=$3,password=$4,phone=$5 WHERE admin_id = $6",
    [name, email, address, password, phone, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Admin info  with ID: ${id} updated`);
    }
  );
};

const updateProvider = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password, phone, address } = req.body;
  console.log(req.body);

  db.query(
    "UPDATE public.provider SET username = $1, email = $2,address=$3,password=$4,phone=$5 WHERE provider_id = $6",
    [name, email, address, password, phone, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Admin info  with ID: ${id} updated`);
    }
  );
};

const checkProvider = (req, res, next) => {

  const { email, password } = req.body;

  console.log(email, password);

  db.query(
    'SELECT * FROM public.provider WHERE is_delete = false ORDER BY provider_id ASC',
    (error, results) => {
      if (error) {
        return res.status(400).json(error)
      }

      const result = results.rows.find((user) => {
        return user.email === email && user.password === password;
      });

      if (result) {
        req.body = result;
        next();
      }
      else {
        res.status(404).send("user not exist");
      }

    }
  );
}

const getCarWithProvider = (req, res) => {
  pool.query(
    'SELECT * FROM public.cars INNER JOIN public.provider ON public.cars.provider_id  = public.provider.provider_id WHERE is_delete = falseORDER BY cars_id DESC',
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getCustomer,
  getCustomerById,
  createCustomer,
  updateCustomerCreaditCard,
  deleteCustomer,
  getCustomercount,
  getCustomerByToken,
  updateUser,

  getAdmin,
  createAdmin,
  deleteAdmin,
  getAdminByToken,
  updateAdmin,

  getProvider,
  getProvidercount,
  getProviderById,
  getNotAcceptedProvider,
  createProvider,
  acceptProvider,
  deleteProvider,
  getProviderByToken,

  getCar,
  getCarscount,
  getCarsById,
  createCar,
  bookCar,
  deleteCars,
  getRentedCarscount,
  getCarsByIdProvider,
  rentedCars,
  updateCar,

  checkProvider,
  checkCustomer,
  getCarWithProvider,
  updateProvider,
  checkAdmin
};