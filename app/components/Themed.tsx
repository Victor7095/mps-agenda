import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
  FlexAlignType,
  Image,
} from "react-native";
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from "react-native-masked-text";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { MaskService } from "react-native-masked-text";
import NumberFormat from "react-number-format";
import { useNavigation } from "@react-navigation/native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { FieldProps } from "formik";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];

export type FormattedNumberProps = ThemeProps &
  DefaultText["props"] & { value: number | string };

export type ViewProps = ThemeProps & DefaultView["props"];

Icon.defaultProps;

export type TextInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: typeof Icon.defaultProps;
  mask?: {
    type: TextInputMaskTypeProp;
    options: TextInputMaskOptionProp;
  };
} & ThemeProps &
  FieldProps &
  DefaultTextInput["props"];

export type MaskedTextInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: typeof Icon.defaultProps;
} & ThemeProps &
  FieldProps &
  TextInputMaskProps &
  DefaultTextInput["props"];

export type TouchableOpacityProps = DefaultTouchableOpacity["props"];

export type SelectProps = {
  name: string;
  placeholder?: string;
  items: { label: string; value: string }[];
  error: string | false | undefined;
  editable?: string;
  onChange: Function;
  onTouch: Function;
  icon?: typeof Icon.defaultProps;
  onValueChange?: Function;
  containerStyle?: StyleProp<ViewStyle>;
};

export type CheckboxProps = {
  name: string;
  placeholder?: string;
  items: { label: string; value: string }[];
  error: string | false | undefined;
  editable?: string;
  onChange: Function;
  onTouch: Function;
  icon?: typeof Icon.defaultProps;
  onValueChange?: Function;
};

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextButton(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textButton"
  );

  return (
    <DefaultText
      style={[{ color, fontFamily: "dustismo", fontSize: 16 }, style]}
      {...otherProps}
    />
  );
}

export function Title(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const defaultStyle = {
    marginVertical: 20,
    color: useThemeColor({ light: lightColor, dark: darkColor }, "tint"),
    fontSize: 22,
    fontFamily: "dustismo",
    textAlign: "center" as "center",
  };
  return <DefaultText style={[defaultStyle, style]} {...otherProps} />;
}

export function InputLabel(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const defaultStyle = {
    marginTop: 20,
    marginHorizontal: 10,
    color: useThemeColor({ light: lightColor, dark: darkColor }, "tint"),
    fontSize: 16,
    fontFamily: "dustismo",
    textAlign: "left" as "left",
    alignSelf: "flex-start" as FlexAlignType,
  };
  return <DefaultText style={[defaultStyle, style]} {...otherProps} />;
}

export function FormattedNumber(props: FormattedNumberProps) {
  const { value, ...otherProps } = props;
  return (
    <NumberFormat
      value={props.value}
      displayType={"text"}
      thousandSeparator="."
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator=","
      prefix={"R$ "}
      renderText={(formattedValue) => (
        <Text {...otherProps}>{formattedValue}</Text>
      )}
    />
  );
}

export const TextInput = React.forwardRef<TextInputMask, TextInputProps>(
  (props, ref) => {
    const {
      containerStyle,
      style,
      icon,
      lightColor,
      darkColor,
      onChangeText,
      field: { name, onBlur, onChange, value },
      form: { errors, touched, setFieldTouched },
      mask,
      ...otherProps
    } = props;
    const hasError = errors[name] && touched[name];

    const colorScheme = useColorScheme();
    let color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "inputBackgroundColor"
    );
    const placeholder = useThemeColor(
      { light: lightColor, dark: darkColor },
      "placeholder"
    );

    const defaultContainerStyle: StyleProp<ViewStyle> = {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      borderRadius: 15,
      borderColor: "transparent",
      borderWidth: 1,
    };

    const defaultInputStyle: StyleProp<ViewStyle> = {
      flex: 1,
      paddingLeft: 10,
    };

    const defaultIconStyle = { paddingVertical: 10, paddingLeft: 10 };
    if (icon) icon.style = { ...defaultIconStyle, ...icon.style };
    let iconColor = Colors[colorScheme].tint;

    if (hasError) {
      defaultContainerStyle.borderColor = "red";
      defaultContainerStyle.borderWidth = 1;
      color = "red";
      iconColor = "red";
    }

    const errorText = {
      fontSize: 12,
      color: "red",
      marginHorizontal: 45,
      alignSelf: "flex-start" as FlexAlignType,
      marginTop: 5,
      fontFamily: "dustismo",
    };

    let input = (
      <DefaultTextInput
        style={[{ color }, defaultInputStyle, style]}
        value={value}
        placeholderTextColor={placeholder}
        onChangeText={(text) => {
          if (onChangeText) onChangeText(text);
          onChange(name)(text);
        }}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...otherProps}
      />
    );
    if (mask) {
      input = (
        <TextInputMask
          type={mask.type}
          style={[{ color }, defaultInputStyle, style]}
          value={value}
          placeholderTextColor={placeholder}
          includeRawValueInChangeText={true}
          onChangeText={(maskedText: string, rawText?: string) => {
            onChange(name)(maskedText);
          }}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...otherProps}
        />
      );
    }

    return (
      <>
        <View
          style={[{ backgroundColor }, defaultContainerStyle, containerStyle]}
        >
          {icon && <Icon color={iconColor} {...icon}></Icon>}
          {input}
        </View>
        {hasError && <Text style={errorText}>{errors[name]}</Text>}
      </>
    );
  }
);

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, disabled, ...otherProps } = props;

  const colorScheme = useColorScheme();

  const defaultStyle: StyleProp<TextStyle> = {
    borderRadius: 10,
    backgroundColor: Colors[colorScheme].tint,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
  };

  if (disabled) {
    defaultStyle.backgroundColor = "#aaa";
  }

  return (
    <DefaultTouchableOpacity style={[defaultStyle, style]} {...otherProps} />
  );
}

export function ReturnButton(props: TouchableOpacityProps) {
  const { style, onPress, ...otherProps } = props;

  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const defaultStyle: StyleProp<TextStyle> = {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  };

  const textStyle = {
    color: Colors[colorScheme].tint,
    paddingLeft: 2,
    fontSize: 16,
    fontFamily: "dustismo",
  };

  const _onPress = onPress || (() => navigation.goBack());

  return (
    <DefaultTouchableOpacity
      style={[defaultStyle, style]}
      onPress={_onPress}
      {...otherProps}
    >
      {props.children || (
        <>
          <Icon
            name="ios-arrow-back"
            size={20}
            color={Colors[colorScheme].tint}
          />
          <Text style={textStyle}>Voltar</Text>
        </>
      )}
    </DefaultTouchableOpacity>
  );
}

export const Select = React.memo(
  React.forwardRef<RNPickerSelect, SelectProps>((props, ref) => {
    const {
      name,
      placeholder,
      error,
      editable,
      icon,
      containerStyle = {},
      ...rest
    } = props;
    const _handleChange = (value: string, index: number) => {
      props.onChange(props.name, value);
      props.onTouch(props.name);
    };

    const colorScheme = useColorScheme();

    const defaultContainerStyle: StyleProp<ViewStyle> = {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      backgroundColor: Colors[colorScheme].inputBackgroundColor,
      borderRadius: 15,
      borderColor: "transparent",
      borderWidth: 1,
      marginTop: 5,
    };
    const defaultIconStyle = { paddingVertical: 10, paddingLeft: 10 };

    if (icon) icon.style = { ...defaultIconStyle, ...icon.style };
    let iconColor = Colors[colorScheme].tint;

    if (error) {
      defaultContainerStyle.borderColor = "red";
      defaultContainerStyle.borderWidth = 1;
      iconColor = "red";
    }

    const errorText = {
      fontSize: 12,
      color: "red",
      marginHorizontal: 45,
      alignSelf: "flex-start" as FlexAlignType,
      marginTop: 5,
      fontFamily: "dustismo",
    };

    return (
      <>
        <View style={[defaultContainerStyle, containerStyle]}>
          {icon && <Icon color={iconColor} {...icon}></Icon>}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "stretch",
              backgroundColor: "transparent",
            }}
          >
            <RNPickerSelect
              style={{
                placeholder: {
                  color: Colors[colorScheme].tint,
                },
                inputIOS: {
                  color: Colors[colorScheme].tint,
                  padding: 10,
                  fontFamily: "dustismo",
                  fontSize: 16,
                },
                inputAndroid: {
                  flex: 1,
                  color: Colors[colorScheme].tint,
                  padding: 10,
                  fontFamily: "dustismo",
                  fontSize: 16,
                },
                viewContainer: {
                  flex: 1,
                },
              }}
              ref={ref}
              placeholder={placeholder ? { label: placeholder, value: "" } : {}}
              {...rest}
              onValueChange={_handleChange}
              onOpen={() => props.onTouch(props.name)}
              onClose={() => props.onTouch(props.name)}
            />
          </View>
        </View>
        {error && <Text style={errorText}>{error}</Text>}
      </>
    );
  })
);


interface ItemData {
	title: string;
	begin: string;
	end: string;
	details: string;
  onVisitButtonPress: Function;
}
  
export function ItemBox(ItemData: ItemData) {
	const colorScheme = useColorScheme();
  
	const boxStyle: StyleProp<ViewStyle> = {
	  backgroundColor: Colors[colorScheme].tint,
	  alignItems: "stretch",
	  alignSelf: "stretch",
	  justifyContent: "center",
	  borderRadius: 10,
	  marginHorizontal: 20,
	  marginTop: 15,
	  paddingHorizontal: 15,
	  height: 100,
	};
  
	const titleStyle = {
	  color: Colors[colorScheme].textButton,
	  fontSize: 20,
	  fontFamily: "dustismo",
	};

  const infoStyle: StyleProp<ViewStyle> = {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  };
  
	const dateStyle = {
	  color: Colors[colorScheme].textButton,
	  fontSize: 14,
	  fontFamily: "dustismo",
	  marginTop: 2,
	};

  const detailsStyle = {
	  color: '#fb3c44',
	  fontSize: 14,
	  fontFamily: "dustismo",
	  marginTop: 2,
	};
    
	return (
		<TouchableOpacity
      style={boxStyle}
      onPress={() => ItemData.onVisitButtonPress()}
    >
		  <DefaultText style={titleStyle}>{ItemData.title}</DefaultText>
		  
      <DefaultView style={infoStyle}>
        <DefaultText style={dateStyle}>Início: {ItemData.begin}</DefaultText>
        <DefaultText style={detailsStyle}>{ItemData.details}</DefaultText>
      </DefaultView>

      <DefaultText style={dateStyle}>Fim: {ItemData.end}</DefaultText>

		</TouchableOpacity>
	);
}
 