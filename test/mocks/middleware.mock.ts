export const authorizedSession = () => {
  return (req, res, next) => {
    req.session = {
      user: 'USER_ID',
    };
    next();
  };
};
