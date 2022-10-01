import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Layout } from './account/Layout';
import { AlgoService } from '../services'

export default AdminForm;

function AdminForm() { 
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        accounts: Yup.string()
        .required('Account is required'),
        assetName: Yup.string()
            .required('Asset Name is required'),
        unitName: Yup.string()
            .required('UnitName is required'),
        totalUnit: Yup.string()
            .required('TotalUnit is required'),
        note: Yup.string()
        .required('note is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        console.log(data)
        let service = AlgoService
        data = {
            'from': data.accounts,
            'assetName': data.assetName,
            'unitName': data.unitName,
            'total': BigInt(data.totalUnit),
            'note': AlgoSigner.encoding.stringToByteArray(data.note),
          }
        service.signAsset(data)
    }

    return (
       <Layout>
            <div className="card">
                <h4 className="card-header">Sign Asset</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Account</label>
                            <select id ="accounts" name="accounts" {...register('accounts')} className={`form-control ${errors.accounts ? 'is-invalid' : ''}`}>
                            </select>
                            <div className="invalid-feedback">{errors.accounts?.message}</div>
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
                            <input name="totalUnit" type="number" {...register('totalUnit')} className={`form-control ${errors.totalUnit ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.totalUnit?.message}</div>
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
