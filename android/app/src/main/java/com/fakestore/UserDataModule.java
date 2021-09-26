package com.fakestore;
import android.content.Context;
import android.content.SharedPreferences;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class UserDataModule extends ReactContextBaseJavaModule {
    UserDataModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "UserDataModule";
    }

    @ReactMethod
    public void save(final String key, final String value, final Promise promise) {
        SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences("UserDataModule", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(key, value);
        editor.apply();
        promise.resolve("saved");
    }

    @ReactMethod
    public void load(final String key, final Promise promise) {
        SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences("UserDataModule", Context.MODE_PRIVATE);
        promise.resolve(sharedPref.getString(key,""));
    }
}
