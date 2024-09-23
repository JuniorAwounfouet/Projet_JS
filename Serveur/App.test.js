import {expect, test} from 'vitest'
import { getUsers } from './App.mjs'

test('devrait verifier qu on recoit une liste', async () => {

    const users = await getUsers();

    expect(users).toBeInstanceOf(Array);
 
})

test('devrait renvoyer le nombre dutilisateurs de la base de données', async () => {

    const users = await getUsers();

    expect(users).toHaveLength(2);

})

test('devrait verifier tous les utilisateurs de la base de données', async () => {

    const users = await getUsers();

    expect(users[0]).toEqual(expect.objectContaining({
        name: 'ange',
        email: 'ange@a.fr',
        message: 'premier'
    }));

})