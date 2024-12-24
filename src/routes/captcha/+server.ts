import captcha from 'svg-captcha'

export const GET = async({ locals })=> {

  const { text , data } = captcha.create({
    width: 120,
    height: 40,
    noise: 4,
    color: true,
    ignoreChars: '1,i,l,o,0'
  })

  locals.session.set('captcha', text.toLowerCase(), 60)

  return new Response(data, {
    headers: {
      'Content-Type': 'image/svg+xml',
    }
  })
}