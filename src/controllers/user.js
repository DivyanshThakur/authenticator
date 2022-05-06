/**
 * @desc Get User data
 * @route GET /user/me
 * @access Private
 */
export const getUser = (req, res) => {
  // JWT Token verification is done in auth middleware
  // It helps in scaling and adding the same functionality to other private apis

  const user = req.user;

  res.json({
    result: true,
    data: {
      fname: user.firstname,
      lname: user.lastname,
      password: user.password, // bad practice, doing it just for the task
    },
  });
};
