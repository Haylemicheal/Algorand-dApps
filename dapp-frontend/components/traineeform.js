import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Layout } from './account/Layout';
import { AlgoService } from '../services'

export default TraineeForm;

function TraineeForm() { 
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        accounts: Yup.string()
        .required('Account is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        console.log(data.accounts)
    }

    return (
       <Layout>
            <div className="card">
                <h4 className="card-header">Search Asset</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Account</label>
                            <select id ="accounts" name="accounts" {...register('accounts')} className={`form-control ${errors.accounts ? 'is-invalid' : ''}`}>
                            </select>
                            <div className="invalid-feedback">{errors.accounts?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Search
                        </button>
                    </form>
                </div>
            </div>
            </Layout>
    );
}
