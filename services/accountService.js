const UserAccountDetailsRepository = require("../repositories/userAccountDetailsRepository");
const logger = require("../logger/logger");

const insertAccountDetails = async (request, response) => {
  const {
    userID,
    firstName,
    lastName,
    address,
    secondaryAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    email,
  } = request.body;

  const userAccountsDetailsRepository = new UserAccountDetailsRepository();

  const existingAccountDetails = await userAccountsDetailsRepository.select(
    userID
  );

  if (existingAccountDetails) {
    const error = `User details already exist for that user`;
    logger.error(error);
    return response.status(409).json({ error });
  } else {
    userAccountsDetailsRepository
      .insert(
        userID,
        firstName,
        lastName,
        address,
        secondaryAddress,
        city,
        state,
        zipCode,
        phoneNumber,
        email
      )
      .then(() => response.status(200).json(request.body))
      .catch((e) =>
        response.status(500).json({ message: "something went wrong" })
      );
  }
};

const retrieveAccountDetails = async (request, response) => {
  const userAccountsDetailsRepository = new UserAccountDetailsRepository();

  const { userID } = request.params;

  const userDetails = await userAccountsDetailsRepository.select(userID);

  if (!userDetails) {
    const error = "User details do not exist for user";
    logger.error(error);
    return response.status(204).json({ error });
  }

  return response.status(200).json(userDetails);
};

const updateAccountDetails = async (request, response) => {
  const {
    userID,
    firstName,
    lastName,
    address,
    secondaryAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    email,
  } = request.body;

  const userAccountsDetailsRepository = new UserAccountDetailsRepository();

  const existingAccountDetails = await userAccountsDetailsRepository.select(
    userID
  );

  if (!existingAccountDetails) {
    const error = `User details do not exist for user`;
    logger.error(error);
    return response.status(204).json({ error });
  } else {
    userAccountsDetailsRepository
      .update(
        userID,
        firstName,
        lastName,
        address,
        secondaryAddress,
        city,
        state,
        zipCode,
        phoneNumber,
        email
      )
      .then(() => response.status(200).json(request.body))
      .catch((e) => {
        response.status(500).json({ message: "something went wrong" });
      });
  }
};

exports.insertAccountDetails = insertAccountDetails;
exports.retrieveAccountDetails = retrieveAccountDetails;
exports.updateAccountDetails = updateAccountDetails;
