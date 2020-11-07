module.exports = {
    userHasPermission,
};

function userHasPermission(user, permission) {
    if (
        !user ||
        !user._id ||
        !user.permissions ||
        !user.permissions.length ||
        !permission.includes('_') ||
        !permission
    )
        return false;
    return (
        user.permissions.includes('admin') ||
        user.permissions.find(
            (perm) =>
                `${permission.split('_')[0]}_*` === perm || perm === permission
        ) !== undefined
    );
}
