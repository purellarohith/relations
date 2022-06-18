import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('user/register', 'UserController.store');
    Route.patch('user/status', 'UserController.update').middleware(['auth']);
    Route.delete('user/delete', 'UserController.delete').middleware(['auth']);
    Route.post('user/login', 'UserController.login');
});
