import joblib
import pandas as pd
import sys
import json

try:
    print("Starting predict.py")
    # Load the models and encoder
    print("Loading rf_model.pkl, xgb_model.pkl, and encoder.pkl")
    rf_model = joblib.load('rf_model.joblib')
    xgb_model = joblib.load('xgb_model.joblib')
    encoder = joblib.load('encoder.joblib')

    # Read input data from command line
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No input data provided'}))
        sys.exit(1)

    print("Raw input args:", sys.argv[1])
    try:
        input_data = json.loads(sys.argv[1])
    except json.JSONDecodeError as e:
        print(json.dumps({'error': f'Invalid JSON input: {str(e)}'}))
        sys.exit(1)
    print("Parsed input:", input_data)

    # Validate required fields
    required_fields = ['title', 'category', 'production_complexity', 'market_demand']
    missing_fields = [field for field in required_fields if field not in input_data]
    if missing_fields:
        print(json.dumps({'error': f'Missing fields: {", ".join(missing_fields)}'}))
        sys.exit(1)

    # Prepare input for the model
    print("Preparing DataFrame")
    single_product = {
        'title': [input_data['title']],
        'category': [input_data['category']],
        'production_complexity': [input_data['production_complexity']],
        'market_demand': [input_data['market_demand']]
    }
    single_df = pd.DataFrame(single_product)

    # Validate categorical inputs
    categorical_cols = ['title', 'category', 'production_complexity', 'market_demand']
    valid_categories = {col: encoder.categories_[i].tolist() for i, col in enumerate(categorical_cols)}
    for col in categorical_cols:
        if single_df[col].iloc[0] not in valid_categories[col]:
            print(json.dumps({
                'error': f"Invalid {col}: {single_df[col].iloc[0]}. Must be one of {valid_categories[col]}"
            }))
            sys.exit(1)

    # Encode features
    print("Encoding features")
    single_encoded = encoder.transform(single_df[categorical_cols])
    single_encoded_df = pd.DataFrame(
        single_encoded,
        columns=encoder.get_feature_names_out(categorical_cols)
    )
    print("Encoded DataFrame:", single_encoded_df.to_dict())

    # Make predictions
    print("Making predictions")
    rf_pred = rf_model.predict(single_encoded_df)[0]
    xgb_pred = xgb_model.predict(single_encoded_df)[0]
    hybrid_pred = (rf_pred + xgb_pred) / 2
    print("Prediction complete:", hybrid_pred)

    # Output result
    print(json.dumps({
        'price': float(hybrid_pred),
        'product_name': input_data['title']
    }))

except Exception as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)