import Organisation from '../models/orgModel.js';
import catchAsync from './catchAsync.js';
import { multerImageUpload } from '../utils/multer.js';

export const uploadOrgImage = multerImageUpload('public/uploads/images', 'org-img').single('photo');

export const updateOrgInfo = catchAsync(async (req, res) => {
  const { orgVision } = req.body;
  const photo = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;

  const orgData = await Organisation.findByIdAndUpdate(
    req.params.orgId,
    {
      photo,
      orgVision,
    },
    { new: true }
  );

  res.json({
    status: 'success',
    data: orgData,
  });
});
