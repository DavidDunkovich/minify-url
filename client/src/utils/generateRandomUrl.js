export default () => {
    let randomUrl = 'http://example.com/';
    const safeUrlCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  
    for (let i = 0; i < 75; i++){
      randomUrl += safeUrlCharacters.charAt(Math.floor(Math.random() * safeUrlCharacters.length));
    }

    return randomUrl;
}