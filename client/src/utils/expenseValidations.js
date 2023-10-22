


export function dataValidations(data) {

    // CHECK IF NAME AND COLOR CODE IS EMPTY!
    if (!data?.name || !data?.code || !data?.currency) {
        throw new Error('Some fields are empty!')
    }

    // CHECK IF NAME IS LESS THAN 4 CHARACTERS!
    if(data?.name?.length < 4){
        throw new Error('Name length must be at least 4 characters!')
    }


    return true;

}