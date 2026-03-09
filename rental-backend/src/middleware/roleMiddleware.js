/**
 * Generic role-based access control
 * Usage: authorizeRoles("ADMIN", "STAFF")
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }
    next();
  };
};

/**
 * ADMIN-only access (backward compatible)
 * Usage: adminOnly
 */
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied: ADMIN only"
    });
  }
  next();
};
