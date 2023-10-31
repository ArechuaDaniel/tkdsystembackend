const hash = () => {
    

    const value =async req.body.password;
        const salt = await bcrypt.genSalt(10);
        return value = await bcrypt.hash(value,salt)
}
 export default hash;