import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Layout } from './account/Layout';

export default AdminForm;

function AdminForm() { 
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        assetName: Yup.string()
            .required('Asset Name is required'),
        unitName: Yup.string()
            .required('UnitName is required'),
        totalUnit: Yup.string()
            .required('TotalUnit is required'),
        decimals: Yup.string()
            .required('Decimals is required'),
        note: Yup.string()
        .required('note is required'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        // return userService.register(user)
        //     .then(() => {
        //         alertService.success('Registration successful', { keepAfterRouteChange: true });
        //         router.push('login');
        //     })
        //     .catch(alertService.error);
    }

    return (
       <Layout>
            <div className="card">
                <h4 className="card-header">Sign Asset</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Account</label>
                            <select id ="accounts" className="form-control">
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Asset Name</label>
                            <input name="assetName" type="text" {...register('assetName')} className={`form-control ${errors.assetName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.assetName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Unit Name</label>
                            <input name="unitName" type="text" {...register('unitName')} className={`form-control ${errors.unitName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.unitName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Total Unit</label>
                            <input name="totalUnit" type="text" {...register('toltalUnit')} className={`form-control ${errors.totalUnit ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.totalUnit?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Decimals</label>
                            <input name="decimals" type="text" {...register('decimals')} className={`form-control ${errors.decimals ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.decimals?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Note</label>
                            <input name="note" type="text" {...register('note')} className={`form-control ${errors.note ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.note?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Sign
                        </button>
                    </form>
                </div>
            </div>
            </Layout>
    );
}
