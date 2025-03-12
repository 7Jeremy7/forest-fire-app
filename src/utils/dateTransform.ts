export function dateTransform(username: string): string{
        const currentDate = new Date(username);
        const formattedDate = `${currentDate.getDate()}/${
            currentDate.getMonth() + 1 
        }/${currentDate.getFullYear()}`;
        return `El usuario fue creado el ${formattedDate}`
}