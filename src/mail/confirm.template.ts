export const ConfirmTemplate = (code: string) => `
<!-- a centered container -->
<h1>One Space</h1>
<div style="text-align: center;">
    <h1>Confirm your email for One Space</h1>
    <h2>Your code: <b>${code}</b></h2>
    </div>
    <!-- this email was... -->
<em>
    This email was sent automatically, please do not reply.
    <br />
    If you did not request this email, please ignore it.
</em>
<p>Copyright (c) One Space</p>
`

export const ConfirmText = (code: string) => `
One Space
Confirm your email for One Space
Your code: ${code}
We received a Sign Up request from your email address.

This email was sent automatically, please do not reply.
If you did not request this email, please ignore it.
Copyright (c) One Space
`
