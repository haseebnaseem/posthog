import { KeyOutlined } from '@ant-design/icons'
import { GithubIcon, GitlabIcon, GoogleIcon } from 'lib/components/icons'
import { SSOProviders } from '~/types'

export const SocialLoginIcon = (provider: SSOProviders): JSX.Element | undefined => {
    if (provider === 'google-oauth2') {
        return <GoogleIcon />
    } else if (provider === 'github') {
        return <GithubIcon />
    } else if (provider === 'gitlab') {
        return <GitlabIcon />
    } else if (provider === 'saml') {
        return <KeyOutlined />
    }
}
