
// put in the app controller, called before the view is called in order to redirect un-authenticated
export function hasUser () {
    return function (ctx, next) {
        if (!ctx.user) {
            ctx.page.redirect('/login');
        } else {
            next();
        }
    }
}


// works with ctx.user and with loader 
export function isOwner() {

    return function (ctx, next) {

        if (ctx.data?.owner?.objectId !== ctx.user?.objectId) {
            ctx.page.redirect('/login');
        } else {
            next();
        }

    }

}
