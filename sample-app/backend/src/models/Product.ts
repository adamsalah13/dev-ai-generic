import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports';
  images: string[];
  inventory: number;
  vendor: mongoose.Types.ObjectId;
  tags: string[];
  rating: number;
  reviewCount: number;
  active: boolean;
  featured: boolean;
  discount?: {
    percentage: number;
    startDate: Date;
    endDate: Date;
  };
  specifications?: Record<string, any>;
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    freeShipping: boolean;
  };
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Product name must be at least 3 characters'],
    maxlength: [200, 'Product name cannot exceed 200 characters'],
    index: true
  },
  
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0.01, 'Price must be greater than 0'],
    max: [999999.99, 'Price cannot exceed $999,999.99'],
    index: true
  },
  
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['electronics', 'clothing', 'books', 'home', 'sports'],
      message: 'Category must be one of: electronics, clothing, books, home, sports'
    },
    index: true
  },
  
  images: [{
    type: String,
    required: true,
    validate: {
      validator: function(url: string) {
        return /^https:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
      },
      message: 'Invalid image URL format'
    }
  }],
  
  inventory: {
    type: Number,
    required: [true, 'Inventory count is required'],
    min: [0, 'Inventory cannot be negative'],
    default: 0
  },
  
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Vendor is required'],
    index: true
  },
  
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
    index: true
  },
  
  reviewCount: {
    type: Number,
    default: 0,
    min: [0, 'Review count cannot be negative']
  },
  
  active: {
    type: Boolean,
    default: true,
    index: true
  },
  
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  
  discount: {
    percentage: {
      type: Number,
      min: [0, 'Discount percentage cannot be negative'],
      max: [99, 'Discount percentage cannot exceed 99%']
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date,
      validate: {
        validator: function(this: IProduct, endDate: Date) {
          return !this.discount?.startDate || endDate > this.discount.startDate;
        },
        message: 'End date must be after start date'
      }
    }
  },
  
  specifications: {
    type: Schema.Types.Mixed,
    default: {}
  },
  
  shipping: {
    weight: {
      type: Number,
      required: [true, 'Product weight is required'],
      min: [0.01, 'Weight must be greater than 0']
    },
    dimensions: {
      length: {
        type: Number,
        required: [true, 'Length is required'],
        min: [0.1, 'Length must be greater than 0']
      },
      width: {
        type: Number,
        required: [true, 'Width is required'],
        min: [0.1, 'Width must be greater than 0']
      },
      height: {
        type: Number,
        required: [true, 'Height is required'],
        min: [0.1, 'Height must be greater than 0']
      }
    },
    freeShipping: {
      type: Boolean,
      default: false
    }
  },
  
  seo: {
    title: {
      type: String,
      maxlength: [60, 'SEO title cannot exceed 60 characters']
    },
    description: {
      type: String,
      maxlength: [160, 'SEO description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      maxlength: [50, 'SEO keyword cannot exceed 50 characters']
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1, active: 1 });
ProductSchema.index({ vendor: 1, active: 1 });
ProductSchema.index({ rating: -1, reviewCount: -1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ featured: 1, active: 1 });

// Virtual for discounted price
ProductSchema.virtual('discountedPrice').get(function(this: IProduct) {
  if (this.discount && this.discount.percentage > 0) {
    const now = new Date();
    if ((!this.discount.startDate || now >= this.discount.startDate) &&
        (!this.discount.endDate || now <= this.discount.endDate)) {
      return this.price * (1 - this.discount.percentage / 100);
    }
  }
  return this.price;
});

// Virtual for stock status
ProductSchema.virtual('inStock').get(function(this: IProduct) {
  return this.inventory > 0;
});

// Virtual for discount status
ProductSchema.virtual('onSale').get(function(this: IProduct) {
  if (!this.discount || this.discount.percentage <= 0) return false;
  
  const now = new Date();
  return (!this.discount.startDate || now >= this.discount.startDate) &&
         (!this.discount.endDate || now <= this.discount.endDate);
});

// Middleware to update the updatedAt field on save
ProductSchema.pre('save', function(this: IProduct, next) {
  this.updatedAt = new Date();
  next();
});

// Middleware to validate discount dates
ProductSchema.pre('save', function(this: IProduct, next) {
  if (this.discount && this.discount.startDate && this.discount.endDate) {
    if (this.discount.endDate <= this.discount.startDate) {
      return next(new Error('Discount end date must be after start date'));
    }
  }
  next();
});

// Static method to find products by category
ProductSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, active: true }).sort({ createdAt: -1 });
};

// Static method to find featured products
ProductSchema.statics.findFeatured = function(limit: number = 10) {
  return this.find({ featured: true, active: true })
    .sort({ rating: -1, reviewCount: -1 })
    .limit(limit);
};

// Static method to search products
ProductSchema.statics.search = function(query: string, options: any = {}) {
  const searchQuery = {
    $and: [
      { active: true },
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  };

  if (options.category) {
    searchQuery.$and.push({ category: options.category });
  }

  if (options.minPrice || options.maxPrice) {
    const priceFilter: any = {};
    if (options.minPrice) priceFilter.$gte = options.minPrice;
    if (options.maxPrice) priceFilter.$lte = options.maxPrice;
    searchQuery.$and.push({ price: priceFilter });
  }

  return this.find(searchQuery)
    .sort(options.sort || { score: { $meta: 'textScore' }, createdAt: -1 })
    .limit(options.limit || 20);
};

export default mongoose.model<IProduct>('Product', ProductSchema);